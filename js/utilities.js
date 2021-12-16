function traslateStatus(expresion) {
  switch (expresion) {
    case true:
      expresion = "Si";
      break;
    default:
      expresion = "No";
      break;
  }
  return expresion;
}
