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

      // Nếu chưa có current, set current = 1
      const currentSnap = await this.currentRef.once('value');
      if (currentSnap.val() === null) {
        console.log('🔄 Setting initial current to 1');
        await this.currentRef.set(1);
      }

      console.log('✅ addToQueue completed, returning:', newNumber);
      return newNumber;
    } catch (error) {
      console.error('❌ Error in addToQueue:', error);
      throw new Error(`Failed to add to queue: ${error}`);
    }
  }

  // lấy current
  async getCurrent(): Promise<number> {
    try {
      const snapshot = await this.currentRef.once('value');
      return snapshot.val() ?? 0;
    } catch (error) {
      throw new Error(`Failed to get current: ${error}`);
    }
  }

  // Subscribe to current number changes (realtime)
  subscribeToCurrentNumber(
    callback: (currentNumber: number) => void,
  ): () => void {
    console.log('🔄 Setting up realtime listener for current number');

    const listener = this.currentRef.on('value', snapshot => {
      const currentNumber = snapshot.val() ?? 0;
      console.log('📡 Current number updated:', currentNumber);
      callback(currentNumber);
    });

    // Return unsubscribe function
    return () => {
      console.log('🔌 Unsubscribing from current number listener');
      this.currentRef.off('value', listener);
    };
  }

  // Update current number (for testing realtime updates)
  async updateCurrentNumber(newCurrentNumber: number): Promise<void> {
    try {
      console.log('🔄 Updating current number to:', newCurrentNumber);
      await this.currentRef.set(newCurrentNumber);
      console.log('✅ Current number updated successfully');
    } catch (error) {
      console.error('❌ Error updating current number:', error);
      throw new Error(`Failed to update current number: ${error}`);
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
