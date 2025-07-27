import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from "axios"
import { API_BASE_URL, STORAGE_KEYS } from "@/shared/utils/constants"
import type { ApiError } from "@/shared/types/api.types"

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 15000, 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      withCredentials: false,
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const fullUrl = `${config.baseURL}${config.url}`

        if (typeof window !== "undefined") {
          const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error: AxiosError) => {
        const apiError: ApiError = {
          message: "Error desconocido",
          status: 500,
        }

        if (error.code === "ECONNABORTED") {
          apiError.message = "Tiempo de espera agotado. El servidor tardó demasiado en responder."
          apiError.status = 408
        } else if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
          apiError.message = "Error de red. Verifica tu conexión a internet."
          apiError.status = 0
        } else if (error.response) {
          apiError.status = error.response.status
          const data = error.response.data as any

          if (data) {
            apiError.message = data.message || `Error ${error.response.status}`
            apiError.errors = data.errors
          }
        } else if (error.request) {
          apiError.message = "No se recibió respuesta del servidor."
          apiError.status = 0
        }

        // Manejo específico de errores de autenticación
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            localStorage.removeItem(STORAGE_KEYS.TOKEN)
            localStorage.removeItem(STORAGE_KEYS.USER)
          }
        }

        return Promise.reject(apiError)
      },
    )
  }

  public async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.client.get(url, { params })
    return response.data
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post(url, data)
    return response.data
  }

  public async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put(url, data)
    return response.data
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete(url)
    return response.data
  }
}

export const apiClient = new ApiClient()
