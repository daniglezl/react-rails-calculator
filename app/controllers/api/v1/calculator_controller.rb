class Api::V1::CalculatorController < ApplicationController

  def evaluate
    expression = calculator_params[:expression]
      .gsub(/\/([0-9.^]+|\([^)]\))/).each { |m|
        ".fdiv(#{m[1..-1]})"
      }
    render json: { result: eval(expression) }
  end

  private

  def calculator_params
    params.permit(:expression)
  end

end