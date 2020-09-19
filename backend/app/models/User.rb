class User < ActiveRecord::Base
    has_secure_password
    has_many :user_stocks
    has_many :user_videos

    validates :email, :uniqueness => true
    validates :first_name, :presence => true 
    validates :first_name, :length => { minimum: 3 }
    validates_with FirstNameAllLettersValidator
end

class FirstNameAllLettersValidator < ActiveModel::Validator
    def validate(record)

        first_name = record.first_name
        first_name.each do |char|
            if char.to_i != 0
                record.errors[:first_name_contains_nums] << "The first name must not contain numbers."
            end
        end
    end
end