export enum ERRORS {
//error messages

  //processes

  PROCESS_NULL = "ERROR: The process is null",
  PROCESS_ADD_ERROR = "ERROR: There was an error adding a process",
  PROCESS_TITLE = "ERROR: Must add process title",
  PROCESSES_HTTP_ERROR = "ERROR: There was an error connecting to the database",

  //stages
  STAGES_HTTP_ERROR = "ERROR: There was an error connecting to the database",
  STAGE_TYPE_SELECT = "ERROR: You must select a type for this stage",
  STAGE_QUESTION_BLANK = "ERROR: You cannot leave a question blank",
  STAGE_PROCESS_NULL = "ERROR: Selected process is null, please select a valid process",

  //responses
  RESPONSES_HTTP_ERROR = "ERROR: There was an error connecting to the database",

  ANSWER_BLANK = "ERROR: You must enter a value before continuing",

  //submit
  SUBMIT_ERROR = "ERROR: There was an error submitting this response",

}
