import database from '@react-native-firebase/database';

export interface QueueItem {
  id: string;
  name: string;
  phoneNumber: string;
  timestamp: number;
  status: 'waiting' | 'called' | 'served';
}

class FirebaseService {
  private queueRef = database().ref('/queue');

  // Thêm khách hàng vào hàng đợi
  async addToQueue(name: string, phoneNumber: string): Promise<string> {
    try {
      const newQueueRef = this.queueRef.push();
      const queueItem: QueueItem = {
        id: newQueueRef.key!,
        name,
        phoneNumber,
        timestamp: Date.now(),
        status: 'waiting',
      };

      await newQueueRef.set(queueItem);
      return queueItem.id;
    } catch (error) {
      throw new Error(`Failed to add to queue: ${error}`);
    }
  }

  // Lắng nghe thay đổi hàng đợi
  subscribeToQueue(callback: (queueItems: QueueItem[]) => void): () => void {
    const onValueChange = (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        const queueItems: QueueItem[] = Object.values(data);
        // Sắp xếp theo thời gian
        queueItems.sort((a, b) => a.timestamp - b.timestamp);
        callback(queueItems);
      } else {
        callback([]);
      }
    };

    this.queueRef.on('value', onValueChange);

    // Trả về function để unsubscribe
    return () => this.queueRef.off('value', onValueChange);
  }

  // Cập nhật trạng thái khách hàng
  async updateQueueItemStatus(
    id: string,
    status: QueueItem['status'],
  ): Promise<void> {
    try {
      await this.queueRef.child(id).update({ status });
    } catch (error) {
      throw new Error(`Failed to update status: ${error}`);
    }
  }

  // Xóa khách hàng khỏi hàng đợi
  async removeFromQueue(id: string): Promise<void> {
    try {
      await this.queueRef.child(id).remove();
    } catch (error) {
      throw new Error(`Failed to remove from queue: ${error}`);
    }
  }

  // Lấy vị trí trong hàng đợi
  async getQueuePosition(id: string): Promise<number> {
    try {
      const snapshot = await this.queueRef.once('value');
      const data = snapshot.val();

      if (!data) return -1;

      const queueItems: QueueItem[] = Object.values(data);
      const waitingItems = queueItems
        .filter(item => item.status === 'waiting')
        .sort((a, b) => a.timestamp - b.timestamp);

      return waitingItems.findIndex(item => item.id === id) + 1;
    } catch (error) {
      throw new Error(`Failed to get queue position: ${error}`);
    }
  }
}

export default new FirebaseService();
