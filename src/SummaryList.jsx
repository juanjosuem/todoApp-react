import React from 'react';

export default function SummaryList({ items }) {
  const numCompletados = items.filter(e => e.completed).length;
  const numPendientes = items.filter(e => !e.completed).length;
  return (
    <React.Fragment>
      <strong>TOTAL: {items.length}</strong> |
      <strong>Nro Completados: {numCompletados}</strong> |
      <strong> Nro Sin Completar: {numPendientes}</strong>
    </React.Fragment>
  );
}
