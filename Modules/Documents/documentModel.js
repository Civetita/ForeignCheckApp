class Document {
    constructor(id, userId, holderName, docType, docNumber, issueDate, validUntil, docStatus) {
      this.id = id;
      this.userId = userId; 
      this.holderName = holderName;
      this.docType = docType;
      this.docNumber = docNumber;
      this.issueDate = issueDate;
      this.validUntil = validUntil;
      this.docStatus = docStatus;
    }
  }
  
  module.exports = Document;
  