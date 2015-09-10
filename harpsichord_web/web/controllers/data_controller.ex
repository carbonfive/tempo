defmodule HarpsichordWeb.DataController do
  use HarpsichordWeb.Web, :controller
  alias HarpsichordWeb.Repo
  alias HarpsichordWeb.ClimateDatum

  def index(conn, _params) do
    data = Repo.all(ClimateDatum)
    render(conn, "index.json", data: data)
  end

  def create(conn, %{"climate" => datum}) do
    changeset = ClimateDatum.changeset(%ClimateDatum{}, datum)

    case Repo.insert(changeset) do
      {:ok, climate_datum} ->
        HarpsichordWeb.Endpoint.broadcast! "data:climate", "new_data", %{datum: %{temperature: climate_datum.temperature, humidity: climate_datum.humidity}}
        render conn, datum: climate_datum
      {:error, changeset} ->
        render conn, datum: "error"
    end
  end
end
