import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Subject } from "rxjs";
import { get, invert, isEmpty } from "lodash";

/**
 * Displays messages of type: `error`, `ìnfo`, `warn`, `success` or `confirmation`.
 * The messages can be static or provided in the REST JSON response. Please refer to our documentation for more informations about the binding configurations of your REST responses' messages:
 * https://wiki.vermeg.com/display/PFD/Workspace+Properties#WorkspaceProperties-F6
 *
 * This class should not be modified directly, you can provide your own service which should extend the default one as follows:
 ```
  export class MyMessageService extends MessagesService {
   ...
   customizeMessage(result: any, message: string) {
     return message;
   }
  }
 ```
 * And provide your class in the `core/custom-core.module.ts` file as follows:
 ```
  providers: [
   { provide: MessagesService, useClass: MyMessageService }
  ]
 ```
 *
 */
@Injectable({
  providedIn: "root"
})
export class MessagesService {
  constructor() {}
  /**
   * Displays the exception message
   * @param {HttpErrorResponse} err - The http error response
   * @return {void}
   */
  showException(err: HttpErrorResponse): void {}
  /**
   * Displays messages provided in the JSON response
   * HttpStatus: 200
   * @param {object} response - The response object
   * @param {string} jsonProperty - The property key to get the data from the response
   * @param {string} messageType - The message type : Info, Error ...
   * @return {void}
   */
  showHttpMessages(
    response: any,
    jsonProperty: string,
    messageType: string = "success"
  ): void {
    const responseData = get(response, jsonProperty);
    if (responseData) {
      this.showMessages(responseData, messageType);
    }
  }
  /**
   * Displays error messages provided in the JSON response
   * HttpStatus: 500
   * @param {object} response - The response object
   * @param {string} jsonProperty - The property key to get the data from the response
   * @param {string} messageType - The message type : Info, Error ...
   * @return {void}
   */
  showErrorHttpMessages(
    response: any,
    jsonProperty: string,
    defaultType: string = "error"
  ): void {
    this.showMessages(get(response, jsonProperty, response), defaultType);
  }
  /**
   * Displays messages from the provided JSON data
   * @param {object} response - The response object
   * @param {string} defaultType - The message type : Info, Error ...
   * @return {void}
   */
  private showMessages(response: any, defaultType: string) {}
  /**
   * Override this method to customize the default message using your own
   * Message service
   */
  customizeMessage(result: any, message: string) {
    return message;
  }
  /**
   * Displays message based on the message type
   * @param {string} content - The message content
   * @param {MessageType} messageType - The message type : Info, Error ...
   * @return {void}
   */
  public openMessage(content: string, messageType): void {
    this.showMessage({
      message: content,
      mode: messageType,
      title: messageType
    });
  }
  /**
   * Displays a success message
   * @param {string} content - The message content
   * @return {void}
   */
  public openSuccessMessage(content: string): void {
    this.showMessage({
      message: content,
      title: "Success",
      mode: "success"
    });
  }
  /**
   * Displays an error message
   * @param {string} content - The message content
   * @return {void}
   */
  public openErrorMessage(content: string): void {
    this.showMessage({
      message: content,
      mode: "error",
      title: "Error",
      duration: 2000
    });
  }
  /**
   * Displays a warning message
   * @param {string} content - The message content
   * @return {void}
   */
  public openWarningMessage(content: string): void {
    this.showMessage({
      message: content,
      mode: "warn",
      title: "Warning"
    });
  }
  /**
   * Displays an info message
   * @param {string} content - The message content
   * @return {void}
   */
  public openInfoMessage(content: string): void {
    this.showMessage({
      message: content,
      mode: "info",
      title: "Information"
    });
  }
  /**
   * Displays any kind of message
   * @param {MessageOptions} message - The messageOptions describing the message
   * @return {void}
   */
  show(message: string, mode: string): void {
    this.showMessage({
      message,
      mode,
      title: mode
    });
  }
  /**
   * Displays any kind message
   * @param {MessageOptions} message - The messageOptions describing the message
   * @return {void}
   */
  showMessage(message?): void {}
  /**
   * Hides a message
   * @return {void}
   */
  hideMessage(): void {}
}
