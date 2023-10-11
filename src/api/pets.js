import instance from ".";

const getAllPets = async () => {
  const res = await instance.get("/pets");
  return res.data;
};

const getOnePet = async (petId) => {
  const res = await instance.get(`/pets/${petId}`);
  return res.data;
};

const addPet = async (name, type, image, adopted) => {
  const res = await instance.post("/pets", {
    name, // name: name or just write name to create the key and value both have same name.
    type,
    image,
    adopted,
  });
  return res.data;
};

const updatePet = async (petId, name, type, image, adopted) => {
  const res = await instance.put(`/pets/${petId}`, {
    name,
    type,
    image,
    adopted: !adopted, // To change from 1 to 0 and vice versa
  });
  return res.data;
};

const deletePet = async (petId) => {
  const res = await instance.delete(`/pets/${petId}`);
  return res.data;
};

export { getAllPets, getOnePet, addPet, updatePet, deletePet };
