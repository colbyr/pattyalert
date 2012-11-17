require 'sinatra'
require 'mongo'

db = Mongo::Connection.new.db("patty")

statuses = {
  'low' => 'No Chicken Patties today :(',
  'medium' => 'Today could be the day...',
  'high' => 'EAT ALL THE CHICKEN PATTIES'
}

get '/' do
  @level = params[:level] ? params[:level] : 'low'
  @status = statuses[@level]
  erb :index
end
