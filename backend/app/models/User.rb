class User < ActiveRecord::Base
    has_secure_password
    has_many :user_stocks
    has_many :user_videos

    validates :email, :uniqueness => true
    validates :first_name, :presence => true 
    validates :first_name, :length => { minimum: 3 }
    validates :last_name, :presence => true
    validates :last_name, :length => { minimum: 3 }

end