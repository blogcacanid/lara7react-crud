<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator,Redirect,Response;
use App\Pegawai;

class PegawaiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pegawais = Pegawai::orderBy('nip', 'asc')->paginate(10);
        return response()->json($pegawais);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nip'           => 'required',
            'nama_pegawai'  => 'required',
            'alamat'        => 'required',
          ]);
   
          $project = Pegawai::create([
            'nip'           => $validatedData['nip'],
            'nama_pegawai'  => $validatedData['nama_pegawai'],
            'alamat'        => $validatedData['alamat'],
          ]);
          $msg = [
              'success' => true,
              'message' => 'Record Update Successfully!'
          ];
          return response()->json($msg);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $pegawai = Pegawai::find($id);
        return response()->json($pegawai);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $pegawai = Pegawai::find($id);
        return response()->json($pegawai);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
          'nip'             => 'required',
          'nama_pegawai'    => 'required',
          'alamat'          => 'required',
        ]);
        $pegawai = Pegawai::find($id);
        $pegawai->nip = $validatedData['nip'];
        $pegawai->nama_pegawai = $validatedData['nama_pegawai'];
        $pegawai->alamat = $validatedData['alamat'];
        $pegawai->save();
        $msg = [
            'success' => true,
            'message' => 'Record updated successfully'
        ];
        return response()->json($msg);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $pegawai = Pegawai::find($id);
        if(!empty($pegawai)){
            $pegawai->delete();
            $msg = [
                'success' => true,
                'message' => 'Record deleted successfully!'
            ];
            return response()->json($msg);
        } else {
            $msg = [
                'success' => false,
                'message' => 'Record deleted failed!'
            ];
            return response()->json($msg);
        }
    }
}
