import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getOnePet, updatePet, deletePet } from "../api/pets";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const PetDetail = () => {
  const { petId } = useParams();
  const queryClient = useQueryClient();

  const { data: pet, isLoading } = useQuery({
    queryKey: ["pet", petId],
    queryFn: () => getOnePet(petId),
  });

  const { mutate: update } = useMutation({
    mutationKey: ["updatePet"],
    mutationFn: () =>
      updatePet(petId, pet.name, pet.type, pet.image, pet.adopted),
    onSuccess: () => {
      queryClient.invalidateQueries(["pet", petId]);
    },
  });

  if (isLoading) return <h1>Loading ...</h1>;

  if (!pet) {
    // return <h1>There is no pet with the id: {petId}</h1>;
    return <Navigate to="/Error404" />;
  }

  return (
    <div className="bg-[#F9E3BE] w-screen h-[100vh] flex justify-center items-center">
      <div className="border border-black rounded-md w-[70%] h-[70%] overflow-hidden flex flex-col md:flex-row p-5">
        <div className="h-full w-full md:w-[35%]">
          <img
            src={pet.image}
            alt={pet.name}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-full md:w-[65%] h-full pt-[30px] flex flex-col p-3">
          <h1>Name: {pet.name}</h1>
          <h1>Type: {pet.type}</h1>
          <h1>adopted: {pet.adopted}</h1>

          <button
            onClick={() => {
              update();
            }}
            className="w-[70px] border border-black rounded-md  hover:bg-green-400 mb-5"
          >
            Adobt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
