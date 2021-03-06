select b.tote_id, b.wave,b.wave_type, b.sku, b.batch_qty_units, p.pick_qty_units, case when b.batch_qty_units <> p.pick_qty_units then 'mismatch'
when p.pick_qty_units is null then 'mismatch' else '' end as cat
from
  ''(select tote_id,wave,sku, wave_type, sum(batch_qty_units) batch_qty_units from
    (select w.tote_id,w.wave, w.qty, w.wave_type, w.sku, w.uom1, p.qty1in2, case when w.uom1 = 'EA' then w.qty else w.qty * p.qty1in2 end as batch_qty_units
      from wcs_msg_t w
      left join pm_f p on w.pkg = p.pkg and w.sku = p.sku
      where wave in (select wave from wv_f)
      and w.transact = 'BPICKCMPLT')
      group by tote_id, sku, wave_type,wave) b
left join
  (select tote_id, wave, sku, wave_type, sum(pick_qty_units) pick_qty_units from


    (select w.tote_id,w.wave, w.wave_type, w.sku, sum(w.qty) sumqty, w.uom1, p.qty1in2, case when w.uom1 = 'EA' then sum(w.qty) else sum(w.qty) * p.qty1in2 end as pick_qty_units
      from wcs_msg_t w
      left join pm_f p on w.pkg = p.pkg and w.sku = p.sku
      where w.wave in (select wave from wv_f)
      and w.transact = 'PICKCMPLT'
      group by w.tote_id, w.wave_type, w.wave,w.sku, w.uom1, p.qty1in2)


      group by tote_id, wave,wave_type, sku) p
on b.tote_id = p.tote_id and b.sku = p.sku and b.wave_type = p.wave_type
and b.wave = p.wave 

