require 'mongo'
require 'json'
require 'twilio-ruby'

db = Mongo::Connection.new.db("pattyalert")
@@coll = db.collection("enthusiasts")

account_sid = ENV['TWILIO_SID']
auth_token = ENV['TWILIO_TOKEN']

@@client = Twilio::REST::Client.new account_sid, auth_token

class Enthusiast
  def initialize attributes
    @attributes = attributes
  end

  def number
    @attributes["number"]
  end

  def attributes
    @attributes
  end

  def save
    @@coll.insert(@attributes)
  end

  def notify msg
    @@client.account.sms.messages.create(
      :from => '+18452622012',
      :to => @attributes["number"],
      :body => msg
    )
  end

  def self.notify_all msg
    @@coll.find.each { |row|
      @@client.account.sms.messages.create(
        :from => '+18452622012',
        :to => row.number,
        :body => msg
      )
    }
  end
end
