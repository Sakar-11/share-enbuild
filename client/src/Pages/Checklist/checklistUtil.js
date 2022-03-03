export const verifyValidity = (role, type) => {
  if (role == "quality_engineer" && type != "quality") {
    return false;
  }
  if (role == "safety_engineer" && type != "safety") {
    return false;
  }
  return true;
};
