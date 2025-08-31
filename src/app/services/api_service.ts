import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Types/Interfaces
export interface AuthenticationRequest {
  login: string;
  password: string;
}

export interface AuthenticationResponse {
  accessToken: string;
}

export interface ArticleDto {
  id?: number;
  codeArticle: string;
  designation: string;
  prixUnitaireHt: number;
  tauxTva: number;
  prixUnitaireTtc: number;
  photo?: string;
  category?: CategoryDto;
  idEntreprise?: number;
}

export interface CategoryDto {
  id?: number;
  code: string;
  designation: string;
  idEntreprise?: number;
}

export interface ClientDto {
  id?: number;
  nom: string;
  prenom: string;
  adresse?: AdresseDto;
  photo?: string;
  mail: string;
  numTel: string;
  idEntreprise?: number;
}

export interface FournisseurDto {
  id?: number;
  nom: string;
  prenom: string;
  adresse?: AdresseDto;
  photo?: string;
  mail: string;
  numTel: string;
  idEntreprise?: number;
}

export interface AdresseDto {
  adresse1: string;
  adresse2?: string;
  ville: string;
  codePostal: string;
  pays: string;
}

export interface CommandeClientDto {
  id?: number;
  code: string;
  dateCommande: Date;
  etatCommande: EtatCommande;
  idEntreprise?: number;
  client?: ClientDto;
  ligneCommandeClients?: LigneCommandeClientDto[];
}

export interface CommandeFournisseurDto {
  id?: number;
  code: string;
  dateCommande: Date;
  etatCommande: EtatCommande;
  idEntreprise?: number;
  fournisseur?: FournisseurDto;
  ligneCommandeFournisseurs?: LigneCommandeFournisseurDto[];
}

export interface LigneCommandeClientDto {
  id?: number;
  article?: ArticleDto;
  quantite: number;
  prixUnitaire: number;
  idEntreprise?: number;
  commandeClient?: CommandeClientDto;
}

export interface LigneCommandeFournisseurDto {
  id?: number;
  article?: ArticleDto;
  quantite: number;
  prixUnitaire: number;
  idEntreprise?: number;
  commandeFournisseur?: CommandeFournisseurDto;
}

export interface VentesDto {
  id?: number;
  code: string;
  dateVente: Date;
  commentaire?: string;
  idEntreprise?: number;
  ligneVentes?: LigneVenteDto[];
}

export interface LigneVenteDto {
  id?: number;
  vente?: VentesDto;
  article?: ArticleDto;
  quantite: number;
  prixUnitaire: number;
  idEntreprise?: number;
}

export interface UtilisateurDto {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  moteDePasse?: string;
  photo?: string;
  dateDeNaissance: Date;
  adresse?: AdresseDto;
  idEntreprise?: number;
}

export interface ChangerMotDePasseUtilisateurDto {
  id: number;
  motDePasse: string;
  confirmMotDePasse: string;
}

export interface EntrepriseDto {
  id?: number;
  nom: string;
  description?: string;
  adresse?: AdresseDto;
  codeFiscal: string;
  photo?: string;
  email: string;
  numTel: string;
  siteWeb?: string;
}

export interface MvtStkDto {
  id?: number;
  dateMvt: Date;
  quantite: number;
  article?: ArticleDto;
  typeMvt: TypeMvtStk;
  sourceMvt: SourceMvtStk;
  idEntreprise?: number;
}

export enum EtatCommande {
  EN_PREPARATION = 'EN_PREPARATION',
  VALIDEE = 'VALIDEE',
  LIVREE = 'LIVREE'
}

export enum TypeMvtStk {
  ENTREE = 'ENTREE',
  SORTIE = 'SORTIE',
  CORRECTION_POS = 'CORRECTION_POS',
  CORRECTION_NEG = 'CORRECTION_NEG'
}

export enum SourceMvtStk {
  COMMANDE_CLIENT = 'COMMANDE_CLIENT',
  COMMANDE_FOURNISSEUR = 'COMMANDE_FOURNISSEUR',
  VENTE = 'VENTE'
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:8080/gestiondestock/v1'; // Ajustez l'URL selon votre configuration

  constructor(private http: HttpClient) {}

  // Authentication endpoints
  authenticate(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/auth/authenticate`, request);
  }

  // Article endpoints
  saveArticle(article: ArticleDto): Observable<ArticleDto> {
    return this.http.post<ArticleDto>(`${this.baseUrl}/articles/create`, article);
  }

  findArticleById(id: number): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(`${this.baseUrl}/articles/${id}`);
  }

  findArticleByCode(code: string): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(`${this.baseUrl}/articles/filter/${code}`);
  }

  findAllArticles(): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.baseUrl}/articles/all`);
  }

  findAllArticlesByCategory(idCategory: number): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.baseUrl}/articles/filter/category/${idCategory}`);
  }

  findHistoriqueVentes(idArticle: number): Observable<LigneVenteDto[]> {
    return this.http.get<LigneVenteDto[]>(`${this.baseUrl}/articles/historique/vente/${idArticle}`);
  }

  findHistoriqueCommandeClient(idArticle: number): Observable<LigneCommandeClientDto[]> {
    return this.http.get<LigneCommandeClientDto[]>(`${this.baseUrl}/articles/historique/commandeclient/${idArticle}`);
  }

  findHistoriqueCommandeFournisseur(idArticle: number): Observable<LigneCommandeFournisseurDto[]> {
    return this.http.get<LigneCommandeFournisseurDto[]>(`${this.baseUrl}/articles/historique/commandefournisseur/${idArticle}`);
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/articles/delete/${id}`);
  }

  // Category endpoints
  saveCategory(category: CategoryDto): Observable<CategoryDto> {
    return this.http.post<CategoryDto>(`${this.baseUrl}/categories/create`, category);
  }

  findCategoryById(id: number): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.baseUrl}/categories/${id}`);
  }

  findCategoryByCode(code: string): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.baseUrl}/categories/filter/${code}`);
  }

  findAllCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.baseUrl}/categories/all`);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categories/delete/${id}`);
  }

  // Client endpoints
  saveClient(client: ClientDto): Observable<ClientDto> {
    return this.http.post<ClientDto>(`${this.baseUrl}/clients/create`, client);
  }

  findClientById(id: number): Observable<ClientDto> {
    return this.http.get<ClientDto>(`${this.baseUrl}/clients/${id}`);
  }

  findAllClients(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(`${this.baseUrl}/clients/all`);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/clients/delete/${id}`);
  }

  // Fournisseur endpoints
  saveFournisseur(fournisseur: FournisseurDto): Observable<FournisseurDto> {
    return this.http.post<FournisseurDto>(`${this.baseUrl}/fournisseurs/create`, fournisseur);
  }

  findFournisseurById(id: number): Observable<FournisseurDto> {
    return this.http.get<FournisseurDto>(`${this.baseUrl}/fournisseurs/${id}`);
  }

  findAllFournisseurs(): Observable<FournisseurDto[]> {
    return this.http.get<FournisseurDto[]>(`${this.baseUrl}/fournisseurs/all`);
  }

  deleteFournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/fournisseurs/delete/${id}`);
  }

  // Commande Client endpoints
  saveCommandeClient(commande: CommandeClientDto): Observable<CommandeClientDto> {
    return this.http.post<CommandeClientDto>(`${this.baseUrl}/commandesclients/create`, commande);
  }

  findCommandeClientById(id: number): Observable<CommandeClientDto> {
    return this.http.get<CommandeClientDto>(`${this.baseUrl}/commandesclients/${id}`);
  }

  findCommandeClientByCode(code: string): Observable<CommandeClientDto> {
    return this.http.get<CommandeClientDto>(`${this.baseUrl}/commandesclients/filter/${code}`);
  }

  findAllCommandesClients(): Observable<CommandeClientDto[]> {
    return this.http.get<CommandeClientDto[]>(`${this.baseUrl}/commandesclients/all`);
  }

  findAllLignesCommandesClientByCommandeId(idCommande: number): Observable<LigneCommandeClientDto[]> {
    return this.http.get<LigneCommandeClientDto[]>(`${this.baseUrl}/commandesclients/lignesCommande/${idCommande}`);
  }

  updateEtatCommandeClient(idCommande: number, etatCommande: EtatCommande): Observable<CommandeClientDto> {
    return this.http.patch<CommandeClientDto>(`${this.baseUrl}/commandesclients/update/etat/${idCommande}/${etatCommande}`, {});
  }

  updateQuantiteCommandeClient(idCommande: number, idLigneCommande: number, quantite: number): Observable<CommandeClientDto> {
    return this.http.patch<CommandeClientDto>(`${this.baseUrl}/commandesclients/update/quantite/${idCommande}/${idLigneCommande}/${quantite}`, {});
  }

  updateClientCommande(idCommande: number, idClient: number): Observable<CommandeClientDto> {
    return this.http.patch<CommandeClientDto>(`${this.baseUrl}/commandesclients/update/client/${idCommande}/${idClient}`, {});
  }

  updateArticleCommandeClient(idCommande: number, idLigneCommande: number, idArticle: number): Observable<CommandeClientDto> {
    return this.http.patch<CommandeClientDto>(`${this.baseUrl}/commandesclients/update/article/${idCommande}/${idLigneCommande}/${idArticle}`, {});
  }

  deleteArticleCommandeClient(idCommande: number, idLigneCommande: number): Observable<CommandeClientDto> {
    return this.http.delete<CommandeClientDto>(`${this.baseUrl}/commandesclients/update/article/${idCommande}/${idLigneCommande}`);
  }

  deleteCommandeClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/commandesclients/delete/${id}`);
  }

  // Commande Fournisseur endpoints
  saveCommandeFournisseur(commande: CommandeFournisseurDto): Observable<CommandeFournisseurDto> {
    return this.http.post<CommandeFournisseurDto>(`${this.baseUrl}/commandesfournisseurs/create`, commande);
  }

  findCommandeFournisseurById(id: number): Observable<CommandeFournisseurDto> {
    return this.http.get<CommandeFournisseurDto>(`${this.baseUrl}/commandesfournisseurs/${id}`);
  }

  findCommandeFournisseurByCode(code: string): Observable<CommandeFournisseurDto> {
    return this.http.get<CommandeFournisseurDto>(`${this.baseUrl}/commandesfournisseurs/filter/${code}`);
  }

  findAllCommandesFournisseurs(): Observable<CommandeFournisseurDto[]> {
    return this.http.get<CommandeFournisseurDto[]>(`${this.baseUrl}/commandesfournisseurs/all`);
  }

  findAllLignesCommandesFournisseurByCommandeId(idCommande: number): Observable<LigneCommandeFournisseurDto[]> {
    return this.http.get<LigneCommandeFournisseurDto[]>(`${this.baseUrl}/commandesfournisseurs/lignesCommande/${idCommande}`);
  }

  updateEtatCommandeFournisseur(idCommande: number, etatCommande: EtatCommande): Observable<CommandeFournisseurDto> {
    return this.http.patch<CommandeFournisseurDto>(`${this.baseUrl}/commandesfournisseurs/update/etat/${idCommande}/${etatCommande}`, {});
  }

  updateQuantiteCommandeFournisseur(idCommande: number, idLigneCommande: number, quantite: number): Observable<CommandeFournisseurDto> {
    return this.http.patch<CommandeFournisseurDto>(`${this.baseUrl}/commandesfournisseurs/update/quantite/${idCommande}/${idLigneCommande}/${quantite}`, {});
  }

  updateFournisseurCommande(idCommande: number, idFournisseur: number): Observable<CommandeFournisseurDto> {
    return this.http.patch<CommandeFournisseurDto>(`${this.baseUrl}/commandesfournisseurs/update/fournisseur/${idCommande}/${idFournisseur}`, {});
  }

  updateArticleCommandeFournisseur(idCommande: number, idLigneCommande: number, idArticle: number): Observable<CommandeFournisseurDto> {
    return this.http.patch<CommandeFournisseurDto>(`${this.baseUrl}/commandesfournisseurs/update/article/${idCommande}/${idLigneCommande}/${idArticle}`, {});
  }

  deleteArticleCommandeFournisseur(idCommande: number, idLigneCommande: number): Observable<CommandeFournisseurDto> {
    return this.http.delete<CommandeFournisseurDto>(`${this.baseUrl}/commandesfournisseurs/update/article/${idCommande}/${idLigneCommande}`);
  }

  deleteCommandeFournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/commandesfournisseurs/delete/${id}`);
  }

  // Ventes endpoints
  saveVente(vente: VentesDto): Observable<VentesDto> {
    return this.http.post<VentesDto>(`${this.baseUrl}/ventes/create`, vente);
  }

  findVenteById(id: number): Observable<VentesDto> {
    return this.http.get<VentesDto>(`${this.baseUrl}/ventes/${id}`);
  }

  findVenteByCode(code: string): Observable<VentesDto> {
    return this.http.get<VentesDto>(`${this.baseUrl}/ventes/${code}`);
  }

  findAllVentes(): Observable<VentesDto[]> {
    return this.http.get<VentesDto[]>(`${this.baseUrl}/ventes/all`);
  }

  deleteVente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ventes/delete/${id}`);
  }

  // Utilisateur endpoints
  saveUtilisateur(utilisateur: UtilisateurDto): Observable<UtilisateurDto> {
    return this.http.post<UtilisateurDto>(`${this.baseUrl}/utilisateurs/create`, utilisateur);
  }

  findUtilisateurById(id: number): Observable<UtilisateurDto> {
    return this.http.get<UtilisateurDto>(`${this.baseUrl}/utilisateurs/${id}`);
  }

  findUtilisateurByEmail(email: string): Observable<UtilisateurDto> {
    return this.http.get<UtilisateurDto>(`${this.baseUrl}/utilisateurs/find/${email}`);
  }

  findAllUtilisateurs(): Observable<UtilisateurDto[]> {
    return this.http.get<UtilisateurDto[]>(`${this.baseUrl}/utilisateurs/all`);
  }

  changerMotDePasse(dto: ChangerMotDePasseUtilisateurDto): Observable<UtilisateurDto> {
    return this.http.post<UtilisateurDto>(`${this.baseUrl}/utilisateurs/update/password`, dto);
  }

  deleteUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/utilisateurs/delete/${id}`);
  }

  // Entreprise endpoints
  saveEntreprise(entreprise: EntrepriseDto): Observable<EntrepriseDto> {
    return this.http.post<EntrepriseDto>(`${this.baseUrl}/entreprises/create`, entreprise);
  }

  findEntrepriseById(id: number): Observable<EntrepriseDto> {
    return this.http.get<EntrepriseDto>(`${this.baseUrl}/entreprises/${id}`);
  }

  findAllEntreprises(): Observable<EntrepriseDto[]> {
    return this.http.get<EntrepriseDto[]>(`${this.baseUrl}/entreprises/all`);
  }

  deleteEntreprise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/entreprises/delete/${id}`);
  }

  // Mouvement Stock endpoints
  getStockReelArticle(idArticle: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/mvtstk/stockreel/${idArticle}`);
  }

  getMvtStkArticle(idArticle: number): Observable<MvtStkDto[]> {
    return this.http.get<MvtStkDto[]>(`${this.baseUrl}/mvtstk/filter/article/${idArticle}`);
  }

  entreeStock(mvtStk: MvtStkDto): Observable<MvtStkDto> {
    return this.http.post<MvtStkDto>(`${this.baseUrl}/mvtstk/entree`, mvtStk);
  }

  sortieStock(mvtStk: MvtStkDto): Observable<MvtStkDto> {
    return this.http.post<MvtStkDto>(`${this.baseUrl}/mvtstk/sortie`, mvtStk);
  }

  correctionStockPos(mvtStk: MvtStkDto): Observable<MvtStkDto> {
    return this.http.post<MvtStkDto>(`${this.baseUrl}/mvtstk/correctionpos`, mvtStk);
  }

  correctionStockNeg(mvtStk: MvtStkDto): Observable<MvtStkDto> {
    return this.http.post<MvtStkDto>(`${this.baseUrl}/mvtstk/correctionneg`, mvtStk);
  }

  // Photo endpoints
  savePhoto(context: string, id: number, photo: File, title: string): Observable<any> {
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('title', title);
    formData.append('context', context);
    formData.append('id', id.toString());
    
    return this.http.post<any>(`${this.baseUrl}/photos/${context}/${id}/${title}`, formData);
  }
}