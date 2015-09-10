defmodule HarpsichordWeb.Repo.Migrations.CreateClimateDatum do
  use Ecto.Migration

  def change do
    create table(:climate_data) do
      add :temperature, :float
      add :humidity, :float

      timestamps
    end

  end
end
