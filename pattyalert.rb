require 'sinatra'
require 'mongo'

db = Mongo::Connection.new.db("patty")

levels = ['low', 'medium', 'high']
messages = {
  'low' => 'There probably won\'t be any patties today...',
  'medium' => 'There might be Patties later... We\'ll keep you posted!',
  'high' => 'There\'s Chicken Patties in the cafeteria!!!'
}

statuses = {
  'low' => 'No Chicken Patties today :(',
  'medium' => 'Today could be the day...',
  'high' => 'EAT ALL THE CHICKEN PATTIES'
}

get '/' do
  @level = (levels.include? params[:level]) ? params[:level] : 'low'
  @status = statuses[@level]
  @message = messages[@level]
  erb :index
end
