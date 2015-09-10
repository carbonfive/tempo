defmodule HarpsichordWeb.ClimateDatumTest do
  use HarpsichordWeb.ModelCase

  alias HarpsichordWeb.ClimateDatum

  @valid_attrs %{humidity: "120.5", temperature: "120.5"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ClimateDatum.changeset(%ClimateDatum{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ClimateDatum.changeset(%ClimateDatum{}, @invalid_attrs)
    refute changeset.valid?
  end
end
