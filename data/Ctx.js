const config = require('../config');
const CachePostgreSQL = require('./CachePostgreSQL');
const CacheRedis = require('./CacheRedis');
const CacheMem = require('./CacheMem');
const redis = require('redis');
const { promisify } = require('util');
const Utils = require('../utils');
const DbMysql = require('./DBMysql');
const DbPostgresql = require('./DBPostgresSQL');

const ctx = {};

//ctx.profiler = profiler;

const postgresSQLConfig = 
{
  user: config.POSTGRESSQL_USER,
  host: config.POSTGRESSQL_HOST,
  database: config.POSTGRESSQL_NAME,
  password: config.POSTGRESSQL_PASSWORD,
  port: POSTGRESSQL_PORT
};

ctx.dbPostgres = new DbPostgresql(postgresSQLConfig);

const mySqlConfig = 
{
  host: config.MYSQL_HOST,
  user:  config.MYSQL_USER,
  password:  config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE
}


ctx.dbMysql = new DbMysql(mySqlConfig);


function newCacheRedis(redis, config)
{
  const dbRedis = redis.createClient({
    host: config.REDIS_HOST,
    port: config.REDIS_PORT
  });
  dbRedis.getAsync = promisify(dbRedis.get).bind(dbRedis);
  dbRedis.setAsync = promisify(dbRedis.set).bind(dbRedis);
  dbRedis.existsAsync = promisify(dbRedis.exists).bind(dbRedis);

  const cache = new CacheRedis(config, dbRedis);
  return cache;
}


if (Utils.toBoolean(config.USE_CACHE_REDIS) && Utils.toBoolean(config.USE_CACHE_POSTGRESQL))
{
  ctx.cache = new CachePostgreSQL(config, ctx.db);
  ctx.cacheRedis = newCacheRedis(redis, config);
}
else if (!Utils.toBoolean(config.USE_CACHE_REDIS) && Utils.toBoolean(config.USE_CACHE_POSTGRESQL))
{
  ctx.cache = new CachePostgreSQL(config, ctx.db);
  ctx.cacheRedis = ctx.cache;
}
else if (Utils.toBoolean(config.USE_CACHE_REDIS) && !Utils.toBoolean(config.USE_CACHE_POSTGRESQL))
{
  ctx.cacheRedis = newCacheRedis(redis, config);
  ctx.cache = ctx.cacheRedis;
}
else if (!Utils.toBoolean(config.USE_CACHE_REDIS) && !Utils.toBoolean(config.USE_CACHE_POSTGRESQL))
{
  ctx.cache = new CacheMem(config);
  ctx.cacheRedis = ctx.cache;
}


module.exports = ctx;