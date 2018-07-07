drop database if exists ibay;
create database ibay;
use ibay;
create table rates (
  country varchar(50),
  basic_rate dec(5, 2),
  expedited_rate dec(5, 2),
  one_day_rate dec(5, 2),
  city_code bigint
);
