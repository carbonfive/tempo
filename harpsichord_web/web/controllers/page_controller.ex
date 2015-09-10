defmodule HarpsichordWeb.PageController do
  use HarpsichordWeb.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
