# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'faker'
require 'date'

user = User.create({email: "guest@gmail.com", password:"qwerty"})

10.times do |index|
  faker_description = Faker::Company.name
  random_amount = (50 + rand*1000).to_i
  faker_comment = Faker::Name.name
  random_yr = (2012 + rand*2).to_i
  random_month = (1 + rand*11).to_i
  random_day = (1 + rand*27).to_i
  random_hr = (1 + rand*22).to_i
  random_min = (1 + rand*58).to_i

  fake_datetime = DateTime.new(random_yr,random_month,random_day,random_hr,random_min)
  Expense.create({amount: random_amount, description: faker_description,
   date_time: fake_datetime, comment: faker_comment, user_id: user.id})
end
