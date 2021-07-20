<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function getTodos()
    {
        $todos = Todo::all();
        return $todos;
    }
}
