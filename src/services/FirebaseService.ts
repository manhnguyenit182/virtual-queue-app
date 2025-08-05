import database from '@react-native-firebase/database';

export interface QueueItem {
  number: number;
  name: string;
  phone: string;
  timestamp: number;
  status: 'waiting' | 'called';
}

class FirebaseService {
  private queueRef = database().ref('/queue');
  private currentRef = database().ref('/current');
  private lastNumberRef = database().ref('/lastNumber');

  // Thêm số vào hàng đợi
  async addToQueue(name: string, phone: string): Promise<number> {
    console.log('🔄 FirebaseService.addToQueue called with:', { name, phone });
    try {
      // Lấy lastNumber hiện tại
      const lastNumberSnap = await this.lastNumberRef.once('value');
      let lastNumber = lastNumberSnap.val();

      if (typeof lastNumber !== 'number') lastNumber = -1;
      const newNumber = lastNumber + 1;
      console.log('🆕 New number will be:', newNumber);

      // Thêm vào queue
      const queueItem = {
        timestamp: Date.now(),
        name,
        phone,
        status: 'waiting',
      };
      console.log('📝 Adding queue item:', queueItem);
      await this.queueRef.child(String(newNumber)).set(queueItem);
      console.log('✅ Queue item added successfully');

      await this.lastNumberRef.set(newNumber);
      console.log('✅ LastNumber updated to:', newNumber);

      // Nếu chưa có current, set current = 0
      const currentSnap = await this.currentRef.once('value');
      if (currentSnap.val() === null) {
        console.log('🔄 Setting initial current to 0');
        await this.currentRef.set(0);
      }

      console.log('✅ addToQueue completed, returning:', newNumber);
      return newNumber;
    } catch (error) {
      console.error('❌ Error in addToQueue:', error);
      throw new Error(`Failed to add to queue: ${error}`);
    }
  }

  // Lắng nghe thay đổi hàng đợi, current, lastNumber
  subscribeToQueue(
    callback: (data: {
      queue: { [key: string]: { timestamp: number; status: string } };
      current: number;
      lastNumber: number;
    }) => void,
  ): () => void {
    const queueListener = this.queueRef.on('value', () => emit());
    const currentListener = this.currentRef.on('value', () => emit());
    const lastNumberListener = this.lastNumberRef.on('value', () => emit());

    const emit = async () => {
      const [queueSnap, currentSnap, lastNumberSnap] = await Promise.all([
        this.queueRef.once('value'),
        this.currentRef.once('value'),
        this.lastNumberRef.once('value'),
      ]);
      callback({
        queue: queueSnap.val() || {},
        current: currentSnap.val() ?? 0,
        lastNumber: lastNumberSnap.val() ?? -1,
      });
    };

    // Trả về function để unsubscribe
    return () => {
      this.queueRef.off('value', queueListener);
      this.currentRef.off('value', currentListener);
      this.lastNumberRef.off('value', lastNumberListener);
    };
  }

  // Cập nhật trạng thái số thứ tự
  async updateQueueItemStatus(
    number: number,
    status: 'waiting' | 'called',
  ): Promise<void> {
    try {
      await this.queueRef.child(String(number)).update({ status });
    } catch (error) {
      throw new Error(`Failed to update status: ${error}`);
    }
  }

  // Xóa số khỏi hàng đợi
  async removeFromQueue(number: number): Promise<void> {
    try {
      await this.queueRef.child(String(number)).remove();
    } catch (error) {
      throw new Error(`Failed to remove from queue: ${error}`);
    }
  }

  // Lấy vị trí trong hàng đợi dựa vào số thứ tự
  async getQueuePosition(number: number): Promise<number> {
    try {
      const snapshot = await this.queueRef.once('value');
      const data = snapshot.val();
      if (!data) return -1;
      const keys = Object.keys(data)
        .map(k => Number(k))
        .sort((a, b) => a - b);
      return keys.indexOf(number) + 1;
    } catch (error) {
      throw new Error(`Failed to get queue position: ${error}`);
    }
  }
}

export default new FirebaseService();
