import { ItemType } from '../types/Items';
import store from '../stores';
import Item from './Item';
import Network from '../services/Network';
import { openTableDialog } from '../stores/tableStore';

export default class Chair extends Item {
  chairId?: string;
  tableId?: string;
  currentUsers = new Set<string>();
  itemDirection?: string;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);

    this.itemType = ItemType.CHAIR;
  }

  private updateStatus() {
    if (!this.currentUsers) return;
    const numberOfUsers = this.currentUsers.size;
    this.clearStatusBox();
    if (numberOfUsers === 1) {
      this.setStatusBox(`${numberOfUsers} 명의 친구가 기다리고 있어요!`);
    } else if (numberOfUsers > 1) {
      this.setStatusBox(`${numberOfUsers} 명의 친구들이 이야기 중이에요!`);
    }
  }

  onOverlapDialog() {
    this.setDialogBox('E 키를 눌러 대화를 시작하세요!');
  }

  addCurrentUser(userId: string) {
    if (!this.currentUsers || this.currentUsers.has(userId)) return;
    this.currentUsers.add(userId);
    const tableState = store.getState().table;
    if (tableState.tableId === this.tableId) {
      tableState.tableTalkManager?.onUserJoined(userId);
    }
    this.updateStatus();
  }

  removeCurrentUser(userId: string) {
    if (!this.currentUsers || !this.currentUsers.has(userId)) return;
    this.currentUsers.delete(userId);
    const tableState = store.getState().table;
    if (tableState.tableId === this.tableId) {
      tableState.tableTalkManager?.onUserLeft(userId);
    }
    this.updateStatus();
  }

  openDialog(playerId: string, network: Network) {
    if (!this.tableId) return;
    store.dispatch(openTableDialog({ tableId: this.tableId, myUserId: playerId }));
    // network.connectToTable(this.tableId);
  }
}
