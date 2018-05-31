class Api::V1::CalculatorController < ApplicationController

  def evaluate
    begin
      expression = calculator_params[:expression]
        .gsub("**", "^")
        .gsub(/\/([0-9.^]+|\([^)]\))/).each { |m|
          ".fdiv(#{m[1..-1]})"
        }
        .gsub("^", "**")
      render json: { result: eval(expression) }
    rescue
      render json: { error: "Invalid expression" }, status: 422
    end
  end

  private

  def calculator_params
    params.permit(:expression)
  end

end