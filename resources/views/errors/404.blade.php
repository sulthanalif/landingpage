@extends('errors.layouts.error', [
    'code' => 404,
    'title' => 'Page Not Found',
    'message' => 'The page you are looking for does not exist.',
    'button' => true,
])
