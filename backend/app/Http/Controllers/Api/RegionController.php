<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RegionResource;
use App\Models\Region;

class RegionController extends Controller
{
    public function index()
    {
        $regions = Region::with('communes')->get();
        
        return RegionResource::collection($regions);
    }
}