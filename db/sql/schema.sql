create database if not exists ibay;
use ibay;
create table if not exists rates (
  country varchar(50),
  basic_rate dec(5, 2),
  expedited_rate dec(5, 2),
  one_day_rate dec(5, 2),
  city_code bigint
);

-- create table cities select city_code, country from rates;