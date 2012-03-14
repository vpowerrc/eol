class SessionsController < ApplicationController

  include EOL::Login

  layout 'v2/sessions'

  before_filter :redirect_if_already_logged_in, :only => [:new, :create]
  before_filter :check_user_agreed_with_terms, :except => [:destroy]
  before_filter :extend_for_open_authentication, :only => [:new, :create]

  rescue_from EOL::Exceptions::OpenAuthMissingAuthorizeUri, :with => :oauth_missing_authorize_uri_rescue

  # GET /sessions/new or named route /login
  def new
    @rel_canonical_href = login_url
  end

  # POST /sessions
  def create
    success, user = User.authenticate(params[:session][:username_or_email], params[:session][:password])
    if success && user.is_a?(User)
      # credentials good but user may still be inactive or hidden, we'll check during log_in
      log_in user
      unless params[:session][:return_to].blank? || params[:session][:return_to] == root_url
        store_location(params[:session][:return_to])
      end
      redirect_back_or_default(user_newsfeed_path(current_user))
    else
      # bad credentials or user missing
      # on failure user is actually an Array
      if user.blank? && User.active_on_master?(params[:session][:username_or_email])
        flash[:notice] = I18n.t(:account_registered_but_not_ready_try_later)
      else
        # bad credentials
        flash[:error] = I18n.t(:sign_in_unsuccessful_error)
        redirect_to login_path
      end
    end
  end

  # DELETE /sessions/:id or named route /logout
  def destroy
    log_out
    store_location(params[:return_to])
    flash[:notice] = I18n.t(:you_have_been_logged_out)
    redirect_back_or_default
  end

private

  def log_out
    cookies.delete :user_auth_token
    lang = current_language.id
    reset_session
    session[:language_id] = lang # Don't want this to change on logout.
  end

  def extend_for_open_authentication
    self.extend(EOL::OpenAuth::ExtendSessionsController) if params[:oauth_provider]
  end

  def oauth_missing_authorize_uri_rescue
    flash[:error] = I18n.t(:authorize_uri_missing, :scope => [:users, :open_authentications, :errors])
    redirect_to login_url
  end

end

