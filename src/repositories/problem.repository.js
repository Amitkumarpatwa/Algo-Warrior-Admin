// const Problem=require('../models');

const { Problem } = require("../models/index.js");
const logger = require("../config/logger.config.js");

class ProblemRepository {
  async createProblem(problemData) {
    try {
      const problem = await Problem.create({
        title: problemData.title,
        description: problemData.description,
        testCases: problemData.testCases ? problemData.testCases : [],
      });
      return problem;
    } catch (error) {
      logger.error(`Error in createProblem: ${error.message}`);
      throw error;
    }
  }

  async getAllProblems() {
    try {
      const problems = await Problem.find({});
      return problems;
    } catch (error) {
      logger.error(`Error in getAllProblems: ${error.message}`);
      throw error;
    }
  }

  async getProblem(id) {
    try {
      const problem = await Problem.findById(id);

      return problem;
    } catch (error) {
      // console.log(error);

      throw error;
    }
  }
  async deleteProblem(id) {
    try {
      const problem = await Problem.findByIdAndDelete(id);
      return problem;
    } catch (error) {
      logger.error(`Error in deleteProblem for ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async updateProblem(id, problemData) {
    try {
      const problem = await Problem.findByIdAndUpdate(id, problemData, {
        new: true,
        runValidators: true,
      });
      return problem;
    } catch (error) {
      logger.error(`Error in updateProblem for ID ${id}: ${error.message}`);
      throw error;
    }
  }
}

module.exports = ProblemRepository;
