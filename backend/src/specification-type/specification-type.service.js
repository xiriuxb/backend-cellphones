import SpecificationType from "../models/specification-types.model.js";

export const bulkCreateSpecifictionTypes = async (data) => {
  try {
    await SpecificationType.bulkCreate(data, { ignoreDuplicates: true });
  } catch (error) {
    throw error;
  }
};

export const findAllSpecifictionTypes = async () => {
  try {
    return await SpecificationType.findAll({
      order: [["name", "ASC"]],
      attributes: ["id", "name", "description"],
    });
  } catch (error) {
    throw error;
  }
};
