require 'sinatra'
require './models/enthusiast.rb'
require 'json'

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

post '/sign_up' do
  number = params[:number]
  result = {
    :exists => false,
    :added => false
  }
  enthusiast = Enthusiast.new({"number" => number})

  if enthusiast.exists
    result[:exists] = true
  else
    saved_enthusiast = enthusiast.save
    enthusiast.notify("Thanks for signing up! You'll never miss Chicken Patty day again! :D")
    result[:added] = true
  end
  result.to_json
end

post '/sight' do
  sighting = Sighting.new(params)
  sighting.save
  Enthusiast.notify_all('CHICKEN PATTIES IN THE CAFETERIA! Get at them!')
  enthusiast.attributes.to_json
end

get '/notify' do
  Enthusiast.notify_all('CHICKEN PATTIES IN THE CAFETERIA! Get at them!')
end

