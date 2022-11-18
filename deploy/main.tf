terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.34"
    }
  }

  required_version = ">= 1.3.0"
}

provider "aws" {
  region = "us-west-2"
}

resource "aws_iam_role" "iam_lambda_newsroom_scraper" {
  name = "iam_lambda_newsroom_scraper"
  assume_role_policy = <<EOF
  {
    "Version": "2012-10-17",
    "Statement": [
        {
        "Action": "sts:AssumeRole",
        "Principal": {
            "Service": "lambda.amazonaws.com"
        },
        "Effect": "Allow",
        "Sid": ""
        }
    ]
  }
  EOF
}

resource "aws_lambda_function" "lambda_newsroom_scraper" {
    environment {
      variables = {

      }
    }
    function_name = "lambda_newsroom_scraper"
    handler = "index.handler"
    role = aws_iam_role.iam_lambda_newsroom_scraper.arn
}
