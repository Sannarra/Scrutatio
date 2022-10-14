<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Throwable;
use Illuminate\Validation\ValidationException;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
        //
        });
    }

    public function render($request, Throwable $e)
    {
        /// Return error messages in json when the request expect a json response
        if ($request->expectsJson()) {
            /// When a model is not found (ex: /api/messages/-1)
            if ($e instanceof ModelNotFoundException) {
                return response()->json([
                    'error' => 'Resource not found.'
                ], 404);
            }
            /// When the request parameters are invalid (using request->validate)
            else if ($e instanceof ValidationException) {
                return response()->json(['error' => $e->getMessage()], 400);
            }
        }
        else {
            /// Redirect to last page if the user is unauthorized
            if ($e instanceof AuthorizationException)
                return redirect()->intended();
        }

        return parent::render($request, $e);
    }
}