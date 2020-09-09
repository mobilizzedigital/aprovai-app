import { getRequest, postRequest } from './utils';

const path = 'OpcaoPlano';

export async function getPlanOptions() {
  return await getRequest('PlanoContratacao');
}

export async function getUserPlan() {
  return await getRequest(path);
}

export async function savePlan(token, clientId, planId, paymentType) {
  return await postRequest(
    path,
    {
      tokenPagamento: token,
      idPlanoContratacao: planId,
      idCliente: clientId,
      idFormaPagamento: paymentType,
      quantidadeParcela: 1
    },
    'application/json'
  );
}
