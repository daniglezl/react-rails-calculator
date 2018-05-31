class Api::V1::CalculatorController < ApplicationController

  def evaluate
    expression = calculator_params[:expression]
    render json: { result: eval(expression) }
  end

  private

  def calculator_params
    params.permit(:expression)
  end

end