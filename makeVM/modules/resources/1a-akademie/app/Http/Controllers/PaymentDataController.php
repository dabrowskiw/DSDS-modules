<?php

namespace App\Http\Controllers;

use App\Models\PaymentData;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentDataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('payment-data.index', ["paymentData" => Auth::user()->paymentData]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('payment-data.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'number' => 'required',
            'cvc' => 'required|numeric',
            'expiration' => 'required'
        ]);

        // Pretend that we are validating the card with a bank or something here

        $item = new PaymentData();
        $item->user_id = Auth::user()->id;
        $item->card_name = $request->input('name');
        $item->card_number = $request->input('number');
        $item->cvc = $request->input('cvc');
        $item->expiration_date = $request->input('expiration');
        $item->save();

        return redirect()->route('payment-data.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PaymentData  $paymentData
     * @return \Illuminate\Http\Response
     */
    public function show(PaymentData $paymentData)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PaymentData  $paymentData
     * @return \Illuminate\Http\Response
     */
    public function edit(PaymentData $paymentData)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PaymentData  $paymentData
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PaymentData $paymentData)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PaymentData  $paymentData
     * @return \Illuminate\Http\Response
     */
    public function destroy(PaymentData $paymentData)
    {
        //
    }
}
