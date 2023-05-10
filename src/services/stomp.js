import { Client } from '@stomp/stompjs';
import config from "../../config.js";
import { STOMP_MESSAGE_TYPE } from "../utils/consts.js";
import { WebSocket } from 'ws';
Object.assign(global, { WebSocket });
class WebSocketService {
  constructor() {
    this.client = null;
  }
  init() {
    if (!config?.stompEnabled) {
      return;
    }
    this.client = new Client(config.stomp);
    this.client.onStompError = (frame) => {
      console.warn("STOMP错误", frame);
    };
  }
  connect() {
    this.client && this.client.activate();
  }
  /**
   * 发送消息
   * @param {*} topic 
   * @param {*} body 
   * @param {*} type 
   */
  publish(topic, data = {}, type = STOMP_MESSAGE_TYPE.UPDATE) {
    console.log("发送STOMP消息", topic, JSON.stringify({ type, data }));
    this.client && this.client.publish({
      destination: topic,
      body: JSON.stringify({ type, data })
    });
  }
  publicAppointment(item, type) {
    this.publish(`/topic/appointment`, item, type);
  }
  publicResource(item, type) {
    this.publish(`/topic/resource`, item, type);
  }
  publicAnnouncement(item, type) {
    this.publish(`/topic/announcement`, item, type);
  }
}
const instance = new WebSocketService()
instance.init();
instance.connect();
export default instance;