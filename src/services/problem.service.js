const sanitizeMarkdownContent = require("../utils/markdownSanitizer.js");
const NotFound = require("../errors/notfound.error.js");
const logger = require("../config/logger.config.js");

class ProblemService {
  constructor(problemRepository) {
    this.problemRepository = problemRepository;
  }
  async createProblem(problemData) {
    // 1, sanitized the markdown for description
    problemData.description = sanitizeMarkdownContent(problemData.description);

    const problem = await this.problemRepository.createProblem(problemData);

    return problem;
  }

  async getAllProblems() {
    const problems = await this.problemRepository.getAllProblems();
    return problems;
  }
  async getProblem(problemId) {
    try {
      const problem = await this.problemRepository.getProblem(problemId);

      if (!problem) {
        // this null when formate id is correct but not exits in collection 
        logger.error(`Problem is not found ${problemId}`);
        
        
        throw new NotFound("Problem", problemId);
      }

      return problem;
    } catch (error) {
      // logger.error(`Problem is not found ${problemId}`);
      // console.log(error);
      
      
      if (error.name === "CastError") {
        logger.error(`Invalid problem id format ${problemId} in the database`);
        console.log(error);
        throw new NotFound("Problem", problemId);
      }

      throw error;
    }
  }
  async deleteProblem(problemId) {
    try {
      const problem = await this.problemRepository.deleteProblem(problemId);

      if (!problem) {
        throw new NotFound("Problem", problemId);
      }

      return problem;
    } catch (error) {
      
      if (error.name === "CastError") {
        throw new NotFound("Problem", problemId);
      }

      throw error;
    }
  }
  async updateProblem(problemId, updateData) {
    try {
      // sanitize description if provided
      if (updateData.description) {
        updateData.description = sanitizeMarkdownContent(
          updateData.description,
        );
      }

      const problem = await this.problemRepository.updateProblem(
        problemId,
        updateData,
      );

      if (!problem) {
        throw new NotFound("Problem", problemId);
      }

      return problem;
    } catch (error) {
      if (error.name === "CastError") {
        throw new NotFound("Problem", problemId);
      }

      throw error;
    }
  }
}

module.exports = ProblemService;
