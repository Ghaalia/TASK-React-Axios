import instance from ".";

const getAllPets = async () => {
  const res = await instance.get("/pets");
  return res.data;
};

const getOnePet = async (petId) => {
  const res = await instance.get(`/pets/${petId}`);
  return res.data;
};

export { getAllPets, getOnePet };
