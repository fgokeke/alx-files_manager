const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.isClientConnected = true;

    // Log errors to the console
    this.client.on('error', (err) => {
      console.error('Redis client error:', err);
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });

    // Promisify the client methods for easier use with async/await
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.isClientConnected;
  }

  async get(key) {
    try {
      const value = await this.getAsync(key);
      return value;
    } catch (err) {
      console.error('Error getting value from Redis:', err);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.setAsync(key, value, 'EX', duration);
    } catch (err) {
      console.error('Error setting value in Redis:', err);
    }
  }

  async del(key) {
    try {
      await this.delAsync(key);
    } catch (err) {
      console.error('Error deleting value from Redis:', err);
    }
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
