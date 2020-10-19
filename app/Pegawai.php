<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    public $table = 'pegawai';
    protected $primaryKey = 'pegawai_id';
    protected $fillable = [
        'pegawai_id',
        'nip',
        'nama_pegawai',
        'alamat'
    ];
}
