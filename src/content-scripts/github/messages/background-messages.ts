import { listenForRuntimeMessages, MessageHandlersType, Operation } from "@/shared/extension-message";
import { destruct } from '../destructor';
import { contentScript } from '../github-script';

const handleResetGithubContentScript = (data: any, sender: xbrowser.runtime.MessageSender) => {
  destruct();
  contentScript.init();
};

class InboundMessages {

  private listener!: MessageHandlersType;

  public startListening() {
    /**
     * Map of message handlers for messages sent to the content script.
     */
    this.listener = listenForRuntimeMessages(new Map<Operation, MessageHandlersType>([
      [Operation.ResetGithubContentScript, handleResetGithubContentScript]
    ]));
  }

  public stopListening() {
    xbrowser.runtime.onMessage.removeListener(this.listener);
  }
}

export const inboundMessages = new InboundMessages();
