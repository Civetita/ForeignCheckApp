class Request {
    constructor(id, userId, type, submittedOn, status, details) {
      this.id = id;
      this.userId = userId; 
      this.submittedOn = submittedOn;
      this.status = status;
      this.details = details;
    }
  }
  
  module.exports = Request;