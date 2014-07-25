class User < ActiveRecord::Base
  before_validation { |user| user.reset_session_token!(false) }

  validates(:password_token,
          :session_token,
          :email,
          :presence => true
          )

  validates(:email, :uniqueness => true)

  has_many :expenses, :dependent => :destroy
  def as_json(options={})
    super(options.merge(:except => [ :password_token, :session_token ]))
  end

  def self.generate_unique_token_for_field(field)
    begin
      token = SecureRandom.base64(16)
    end until !self.exists?(field => token)

    token
  end

  def self.generate_session_token
    self.generate_unique_token_for_field(:session_token)
  end

  def self.find_by_credentials(email, secret)
    user = User.find_by_email(email)

    user.is_password?(secret) ? user : nil
  end

  def password=(secret)
    @password = secret
    self.password_token = BCrypt::Password.create(secret).to_s
  end

  def is_password?(secret)
    BCrypt::Password.new(self.password_token).is_password?(secret)
  end

  def reset_session_token!(force = true)
    return unless self.session_token.nil? || force

    self.session_token = User.generate_session_token
    self.save!
  end
end
