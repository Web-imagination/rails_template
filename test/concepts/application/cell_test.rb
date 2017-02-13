require 'test_helper'

class ApplicationConceptTest < Cell::TestCase
  test "show" do
    html = concept("application/cell").(:show)
    assert html.match /<p>/
  end


end
