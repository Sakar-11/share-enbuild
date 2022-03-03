export const setupNavTitle = (loc, setState, setIsBack) => {
  const temp = loc.split("/");
  //
  if (temp.length == 4) {
    if (temp[1] == "activities") {
      setState("Floor list");
      setIsBack(true);
      return;
    }
    if (temp[1] == "checklist") {
      setState(
        `${temp[2].charAt(0).toUpperCase() + temp[2].slice(1)} Checklist`
      );
      setIsBack(true);
      return;
    }
  }
  if (temp.length == 5) {
    if (temp[1] == "activities") {
      setState("Flat list");
      setIsBack(true);
      return;
    }
    if (temp[1] == "checklist") {
      setState(`Add Checklist`);
      setIsBack(true);
      return;
    }
  }
  if (loc == "/editUser") {
    setState("Edit users");
    setIsBack(false);
    return;
  }
  if (loc === "/activities") {
    setState("Activities");
    setIsBack(false);
    return;
  }
  if (loc === "/checklist/safety") {
    setState("Safety Checklist");
    setIsBack(false);
    return;
  }
  if (loc === "/checklist/quality") {
    setState("Quality Checklist");
    setIsBack(false);
    return;
  }
  if (loc == "/register") {
    setState("Register User");
    setIsBack(true);
    return;
  }
  if (loc == "/registerAdmin") {
    setState("Register Admin");
    return;
  }
  if (loc === "/issues/safety") {
    setState("Safety Issues");
    setIsBack(false);
    return;
  }
  if (loc === "/issues/quality") {
    setState("Quality Issues");
    setIsBack(false);
    return;
  }

  if (loc === "/todo") {
    setState("To do");
    setIsBack(false);
    return;
  }
  if (loc === "/projectList") {
    setState("Projects");
    setIsBack(false);
    return;
  }
  if (loc === "/addProject") {
    setState("Add Project");
    setIsBack(true);
    return;
  }
  if (loc === "/material") {
    setState("Purchase");
    setIsBack(false);
    return;
  }
  if (loc === "/plan") {
    setState("Planning");
    setIsBack(false);
    return;
  }
  if (loc === "/dpr") {
    setState("DPR");
    setIsBack(false);
    return;
  }
  if (loc === "/login") {
    setState("Enbuild");
    setIsBack(false);
    return;
  }
  if (loc === "/subprojectList") {
    setState("Subprojects");
    setIsBack(false);
    return;
  }
  if (loc === "/barchart") {
    setState("Bar Chart");
    setIsBack(false);
    return;
  }
  if (loc === "/store") {
    setState("Store");
    setIsBack(false);
    return;
  }
  if (loc === "/addMaterial") {
    setState("Add Material");
    setIsBack(false);
    return;
  }
  if (loc === "/monitoring") {
    setState("Monitoring");
    setIsBack(false);
    return;
  }
  if (loc === "/support") {
    setState("Support");
    setIsBack(false);
    return;
  }
  if (loc === "/dashboard") {
    setState("Dashboard");
    setIsBack(false);
    return;
  }
  setIsBack(true);
};
