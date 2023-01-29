import {snowflakeGenerator} from 'snowflake-id-js';

const generator = snowflakeGenerator(512);

let id = generator.next().value;

console.log(typeof id, id)