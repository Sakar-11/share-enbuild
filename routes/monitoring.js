const Monitoring = require("../models/monitoring.model");
const Barchart = require("../models/barchart.model");
const router = require("express").Router();
const Apartment = require("../models/apartment.model");
const Projects = require("../models/project.model");
const ObjectId = require("mongodb").ObjectID;
const userLogin = require("../models/userLogin.model");
const utils = require("./notificationsUtil");
const DefaultActivities = require("../models/defaultProjectActivities.model");
// there are differnet functions for each of the notifications becasue the notifications may change later depending upon the type !
const monitoringNotifications = async subprojectId => {
  console.log("hi buddy");
  var notif_roles = [
    "senior_engineer",
    "project_manager",
    "planning_manager",
    "chief_engineer",
    "technical_director",
  ];
  console.log(subprojectId);
  await Projects.findOne(
    { apartments: { $in: [ObjectId(subprojectId)] } },
    async (err, resp) => {
      if (err) {
        throw err;
      }
      console.log(resp._doc["totalUsers"]);
      var notif_array = [];
      for (var user of resp._doc["totalUsers"]) {
        console.log(user);
        if (notif_roles.includes(user["role"])) notif_array.push(user["user"]);
      }
      console.log(notif_array);
      await userLogin.find(
        {
          _id: { $in: notif_array },
        },
        async function (err, docs) {
          var users = [];
          for (var doc of docs) {
            users = users.concat(doc._doc["notification_id"]);
          }
          users = users.filter(element => {
            return element != undefined;
          });
          await Apartment.findById(subprojectId, (err, resp_) => {
            // console.log(resp_._doc["subProjectName"]);
            utils.notify(
              users,
              resp_._doc["subProjectName"],
              "An Activity is Updated ! Check It Out in Monitoring Options !"
            );
          });
        }
      );
    }
  );
};

router
  .route("/getActivities/:subprojectId/:projectId")
  .get(async (req, res) => {
    const subprojectId = req.params.subprojectId;
    const projectId = req.params.projectId;
    try {
      var response = await Monitoring.findOne({ subprojectId });
      response = JSON.stringify(response);
      response = JSON.parse(response);
      response = response ? response.data : [];

      var barresponse = await Barchart.findOne({ subprojectId });
      // const bardata = barresponse[0]._doc.data;
      barresponse = JSON.stringify(barresponse);
      barresponse = JSON.parse(barresponse).data;

      // console.log(barresponse);

      var activity = await DefaultActivities.findOne({ projectId });
      activity = JSON.stringify(activity);
      activity = JSON.parse(activity).data;

      // console.log(response, activity, barresponse);

      var newData = activity.map(item => {
        var remarkMoni = response.find(newItem => item.title === newItem.title);
        remarkMoni = remarkMoni ? remarkMoni.remark : remarkMoni;
        var barItem = barresponse.find(newItem => newItem[0] === item.title);
        // console.log(barItem);
        // console.log(remarkMoni);
        var estimatedcompletion = "";
        if (!barItem) {
          estimatedcompletion = "Not available";
        } else if (barItem[1] == null || barItem[2] == null) {
          estimatedcompletion = "Not available";
        } else if (Date.now() <= Date.parse(barItem[1])) {
          estimatedcompletion = "Not started yet";
        } else if (Date.now() >= Date.parse(barItem[2])) {
          estimatedcompletion = 100 + "%";
        } else {
          estimatedcompletion =
            Math.ceil(
              ((Date.now() - Date.parse(barItem[1])) /
                (1000 * 3600 * 24) /
                barItem[3]) *
                100
            ) + "%";
        }
        return {
          visibility: item.visibility,
          title: item.title,
          estimatedcompletion,
          actualcompletion: 0.0,
          remark: remarkMoni,
        };
      });

      // console.log(newData);

      // let dataArray = [];

      return res.status(200).json(newData);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });

router.route("/getDate").get(async (req, res) => {
  try {
    const response = await Barchart.find();
    const data = response[0]._doc.data;
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.route("/updateActivities").post(async (req, res) => {
  const { subprojectId, data } = req.body;
  try {
    // have't tested it
    monitoringNotifications(subprojectId);

    const doc = await Monitoring.findOne({ subprojectId });
    // console.log(doc);
    if (doc) {
      await Monitoring.updateOne(
        { subprojectId: subprojectId },
        { $set: { data: data } }
      );
    } else {
      const newData = new Monitoring({
        subprojectId,
        data,
      });
      await newData.save();
      // console.log(newData);
    }

    return res.status(200).json({ msg: "Activities updated", success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
